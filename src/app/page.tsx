// app/page.tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/gallery"); // 只要有人访问首页，瞬间踢到 /gallery 页面
}
