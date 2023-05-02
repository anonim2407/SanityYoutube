import Header from "@/components/Header";
import { sanityClient } from "@/sanity";
import { Post } from "@/typings";
import { GetStaticProps } from "next";
import { urlFor } from "@/sanity";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";
import { error } from "console";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout/Layout";

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const { comments } = post;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

  return (
    <Layout>
      <main className="mx-auto bg-slate-800">
        <Image
          className=" w-full  object-cover h-96"
          src={urlFor(post.mainImage.asset).url()!}
          width={1000}
          height={1000}
          alt={" Image Post"}
        />

        <article className=" max-w-3xl mx-auto p-5 space-y-5">
          <h1 className=" text-3xl mt-10 mb-3 text-green-300 font-bold ">
            {post.title}
          </h1>
          <div className=" flex flex-col gap-4">
            <div className="flex justify-start items-center gap-2 w-full text-left bg-neutral-300 rounded-lg p-2">
              <span className=" text-lg">&#128176;</span>
              <p>{post.price.title}</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-full text-left bg-blue-300 rounded-lg p-2">
              <span className=" text-lg">&#127759;</span>
              <Link className="underline underline-offset-2" href={post.link}>
                {post.link}
              </Link>
            </div>
            <div className="flex justify-start items-center gap-2 w-full  text-left bg-indigo-300 rounded-lg p-2">
              <span className=" text-lg">&#128196;</span>
              <PortableText
                className=""
                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                content={post.body}
                serializers={{
                  h1: (props: any) => (
                    <h1 className=" text-2xl font-bold my-5 ">{...props}</h1>
                  ),
                  h2: (props: any) => (
                    <h1 className=" text-xl font-bold my-5 ">{...props}</h1>
                  ),
                  li: ({ children }: any) => (
                    <li className="ml-4 list-disc ">{children}</li>
                  ),
                  link: ({ href, children }: any) => (
                    <a href={href} className=" text-blue-500 hover:underline">
                      {children}
                    </a>
                  ),
                }}
              />
            </div>
          </div>
        </article>

        <hr className="max-w-lg my-10 mx-auto border border-green-300" />

        {/* Comments */}
        <div className=" container max-w-3xl mx-auto p-5">
          <div className="flex justify-start items-center gap-2 w-full text-left bg-neutral-500 rounded-lg p-2">
            <span className=" text-lg">&#128172;</span>
            <h3 className="">Comments</h3>
          </div>
          {comments.map((comment) => (
            <div key={comment._id}>
              <p>
                <span className=" text-yellow-500">{comment.name} :</span>{" "}
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
        {submitted ? (
          <div className="flex flex-col p-10 my-10 bg-green-300 text-gray-200 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold">
              Thank you for submitting your comment!
            </h3>
            <p>Once it has been approved, it will appear below!</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col p-5 max-w-2xl mx-auto text-slate-100"
          >
            <h3 className="text-2xl font-bold my-4">
              Deja tu opinión sobre la Inteligencia Artificial
            </h3>

            <input
              {...register("_id")}
              type="hidden"
              name="_id"
              value={post._id}
            />

            <label className="block mb-5">
              <span className=" text-gray-300">Name</span>
              <input
                {...register("name", { required: true })}
                className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-green-300 bg-transparent outline-none focus:ring"
                placeholder="Tu nombre"
                type="text"
              />
            </label>
            <label className="block mb-5">
              <span className=" text-gray-300">Email</span>
              <input
                {...register("email", { required: true })}
                className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-green-300 bg-transparent outline-none focus:ring"
                placeholder="Tu correo electrónico"
                type="email"
              />
            </label>

            <label className="block mb-5">
              <span className=" text-gray-300">Comment</span>
              <textarea
                {...register("comment", { required: true })}
                className=" shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-green-300 bg-transparent outline-none focus:ring "
                placeholder="Tu comentario"
                rows={8}
              />
            </label>

            <div className=" flex flex-col p-5">
              {errors.name && (
                <span className="text-red-500">
                  - The Name Field is required
                </span>
              )}
              {errors.comment && (
                <span className="text-red-500">
                  - The Comment Field is required
                </span>
              )}
              {errors.email && (
                <span className="text-red-500">
                  - The Email Field is required
                </span>
              )}
            </div>

            <input
              type="submit"
              className=" shadow bg-green-300 hover:bg-green-400 focus:shadow-outline focus:outline-none text-black font-bold px-4 py-2 rounded cursor-pointer"
            />
          </form>
        )}
      </main>
    </Layout>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
        slug{
            current
        }
      }`;
  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    description,
      mainImage,
      slug,    
      category->{title},
      price->{title},
      link,
      body,
        "comments": *[
          _type == "comment" &&
          post._ref == ^._id &&
          approved == true],    
    }`;
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // despues de 60 segundos actualiza todos los posts
  };
};
