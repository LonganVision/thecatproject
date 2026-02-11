import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

// 1. 简单的组件内容（你可以想象成三个不同的网页）
const Gallery = () => (
  <div>
    <h2>📷 图片库页面</h2>
    <p>这里展示所有狗狗的照片。</p>
  </div>
);
const Breeds = () => (
  <div>
    <h2>🐶 品种列表页</h2>
    <p>点击查看不同品种的详细信息。</p>
  </div>
);

const BreedDetail = () => {
  const { breed_id } = useParams();
  return (
    <div>
      <h2>🔍 品种详情</h2>
      <p>
        你正在查看的是：<strong>{breed_id}</strong>
      </p>
    </div>
  );
};

function App() {
  return (
    <div style={{ padding: "20px" }}>
      {/* 导航栏：方便你在页面上点，不用手动改网址 */}
      <nav>
        <Link to="/gallery">相册</Link> | <Link to="/breeds">品种</Link> |{" "}
        <Link to="/breeds/shiba">品种详情</Link>
      </nav>

      <hr />

      {/* 路由匹配核心区域 */}
      <Routes>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/breeds" element={<Breeds />} />
        <Route path="/breeds/:breed_id" element={<BreedDetail />} />

        {/* 默认首页 */}
        <Route path="/" element={<h2>👋 欢迎来到主页</h2>} />
      </Routes>
    </div>
  );
}

export default App;
