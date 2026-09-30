import {
  CategoryView,
  categoryMetadata,
  categoryParams,
  type CategoryParams,
} from "../../_work/category-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return categoryParams("design");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<CategoryParams>;
}) {
  return categoryMetadata("design", (await params).category);
}

export default async function DesignCategoryPage({
  params,
}: {
  params: Promise<CategoryParams>;
}) {
  return <CategoryView area="design" slug={(await params).category} />;
}
