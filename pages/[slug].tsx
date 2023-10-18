import { GetServerSideProps } from "next";

const SlugRedirect = () => {
  return <></>;
};

export default SlugRedirect;

export const getServerSideProps = async (context: any) => {
  const slug = context.params?.slug;
  if (!slug) return { notFound: true };
  const res = await fetch(`${process.env.NEXT_API_URL}/url/${slug}/baseUrl`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status !== 200) return { notFound: true };
  const data = await res.text();
  return {
    redirect: {
      destination: data,
      basePath: false,
    },
  };
};
