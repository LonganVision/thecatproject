// src/app/gallery/page.tsx (Server Component)
import { catApi } from "../../api/catApi";
import CatCard from "../../components/CatCard/CatCard";
import CatListContainer from "../../components/CatList/CatListContainer";

// src/app/gallery/page.tsx
export default async function GalleryPage() {
  const initialCats = await catApi.fetchCats(12, 0);

  return (
    <main>
      {/* 使用随机数或者固定字符串作为 key，
          强制 Next.js 在每次进入该页面时重新挂载 Client Component */}
      <CatListContainer key={new Date().getTime()} initialPage={0}>
        {initialCats.map((cat) => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </CatListContainer>
    </main>
  );
}
