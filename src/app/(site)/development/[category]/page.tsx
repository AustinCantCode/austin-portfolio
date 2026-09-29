import {
  CategoryView,
  categoryMetadata,
  categoryParams,
  type CategoryParams,
} from "../../_work/category-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return categoryParams("dev");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<CategoryParams>;
}) {
  return categoryMetadata("dev", (await params).category);
}

export default async function DevelopmentCategoryPage({
  params,
}: {
  params: Promise<CategoryParams>;
}) {
  return <CategoryView area="dev" slug={(await params).category} />;
}
