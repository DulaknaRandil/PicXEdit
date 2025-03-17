import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { getImageById } from "@/lib/actions/image.actions";

const ImageDetails = async ({ params, searchParams }: SearchParamProps) => {
  const { id, type } = await params;
  const searchParamsResolved = await searchParams;
  const page = Number(searchParamsResolved?.page) || 1;
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const image = await getImageById(id);
  const user = await getUserById(userId);

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Update"
          userId={user._id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default ImageDetails;