import Header from "@/components/Header";
import Head from "next/head";
import { sanityClient, urlFor } from "../sanity";
import { Categorys, Post } from "@/typings";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import PortableText from "react-portable-text";
import { useState,useEffect } from "react";
interface Props {
  posts: [Post];
  category: [Categorys];
}

export default function Home({ posts, category }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("0");
  const filteredItems = posts.filter((item) => item.category._id === selectedCategory);
console.log(selectedCategory)
  useEffect(() => {
  console.log(filteredItems)
  }, [selectedCategory])
  
  console.log(filteredItems);
  return (
    <Layout
      title={
        "Directorio de IA: Todas las soluciones de inteligencia artificial en un solo lugar"
      }
      description={
        "Encuentra todas las soluciones de inteligencia artificial que necesitas en nuestro directorio completo de IA. Descubre lo último en tecnología de IA y recursos útiles para cualquier necesidad."
      }
    >
      <div className="mx-auto">
        <section
          className="h-screen flex justify-end items-center   border-black text-center md:text-right"
          style={{
            backgroundImage: "url(/img/bg-header6.jpg)",
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="px-5 space-y-5 text-green-300  container max-w-7xl mx-auto flex flex-col justify-end items-center md:items-end">
            <h1 className="text-2xl md:text-4xl max-w-xl uppercase  text-green-300">
              El mayor directorio de{" "}
              <span className="text-5xl md:text-6xl font-bold ">
                Inteligencias Artificiales
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl uppercase ">Gratis</h2>
          </div>
        </section>

        <section className="container max-w-7xl mx-auto ">
          <article className=" flex justify-center my-10">
            <select
              className=" rounded-lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value={"0"}>-- Selecciona una categoria --</option>
              {category.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.title}</option>
              ))}
            </select>
          </article>
          <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6 p-4 md:p-6">
            {selectedCategory === "0"
              ? posts.map((post) => (
                  <div key={post._id} className="card relative h-96 w-auto ">
                    <div className="face front">
                      <Image
                        className=" absolute w-full h-full object-cover"
                        src={urlFor(post.mainImage.asset).url()!}
                        width={1000}
                        height={1000}
                        alt={" Image Post"}
                      />
                      <div className=" absolute bottom-0 left-0 right-0 text-center py-4 bg-[#595d5f] backdrop-blur-[9px] text-lg font-semibold ">
                        <h4 className=" text-green-300">{post.title}</h4>
                      </div>
                    </div>
                    <div className="face back w-full h-full text-center flex flex-col justify-center gap-5 items-center">
                      <p className="text-xl font-bold text-green-300">
                        {post.title}
                      </p>
                      <ul className=" flex flex-col gap-2 overflow-y-auto rounded-lg">
                        <li className="flex justify-start items-center gap-2 w-full text-left bg-neutral-300 rounded-lg p-2">
                          <span className=" text-lg">&#128176;</span>
                          <p>{post.price.title}</p>
                        </li>
                        <li className="flex justify-start items-center gap-2 w-full text-left bg-blue-300 rounded-lg p-2">
                          <span className=" text-lg">&#127759;</span>
                          <Link
                            className=" underline underline-offset-2"
                            href={post.link}
                          >
                            {post.link}
                          </Link>
                        </li>
                        <li className="flex justify-start items-center gap-2 w-full  text-left bg-indigo-300 rounded-lg p-2">
                          <span className=" text-lg">&#128196;</span>
                          <PortableText
                            className=""
                            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                            projectId={
                              process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
                            }
                            content={post.body}
                            serializers={{
                              h1: (props: any) => (
                                <h1 className=" text-2xl font-bold my-5 ">
                                  {...props}
                                </h1>
                              ),
                              h2: (props: any) => (
                                <h1 className=" text-xl font-bold my-5 ">
                                  {...props}
                                </h1>
                              ),
                              li: ({ children }: any) => (
                                <li className="ml-4 list-disc ">{children}</li>
                              ),
                              link: ({ href, children }: any) => (
                                <a
                                  href={href}
                                  className=" text-blue-500 hover:underline"
                                >
                                  {children}
                                </a>
                              ),
                            }}
                          />
                        </li>
                      </ul>
                      <Link
                        className="p-3 bg-green-300 rounded-lg"
                        href={`/post/${post.slug.current}`}
                      >
                        Mas Detalle
                      </Link>
                    </div>
                  </div>
                ))
              : filteredItems?.map(post => (
                  <div key={post._id} className="card relative h-96 w-auto ">
                    <div className="face front">
                      <Image
                        className=" absolute w-full h-full object-cover"
                        src={urlFor(post.mainImage.asset).url()!}
                        width={1000}
                        height={1000}
                        alt={" Image Post"}
                      />
                      <div className=" absolute bottom-0 left-0 right-0 text-center py-4 bg-[#595d5f] backdrop-blur-[9px] text-lg font-semibold ">
                        <h4 className=" text-green-300">{post.title}</h4>
                      </div>
                    </div>
                    <div className="face back w-full h-full text-center flex flex-col justify-center gap-5 items-center">
                      <p className="text-xl font-bold text-green-300">
                        {post.title}
                      </p>
                      <ul className=" flex flex-col gap-2 overflow-y-auto rounded-lg">
                        <li className="flex justify-start items-center gap-2 w-full text-left bg-neutral-300 rounded-lg p-2">
                          <span className=" text-lg">&#128176;</span>
                          <p>{post.price.title}</p>
                        </li>
                        <li className="flex justify-start items-center gap-2 w-full text-left bg-blue-300 rounded-lg p-2">
                          <span className=" text-lg">&#127759;</span>
                          <Link
                            className=" underline underline-offset-2"
                            href={post.link}
                          >
                            {post.link}
                          </Link>
                        </li>
                        <li className="flex justify-start items-center gap-2 w-full  text-left bg-indigo-300 rounded-lg p-2">
                          <span className=" text-lg">&#128196;</span>
                          <PortableText
                            className=""
                            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                            projectId={
                              process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
                            }
                            content={post.body}
                            serializers={{
                              h1: (props: any) => (
                                <h1 className=" text-2xl font-bold my-5 ">
                                  {...props}
                                </h1>
                              ),
                              h2: (props: any) => (
                                <h1 className=" text-xl font-bold my-5 ">
                                  {...props}
                                </h1>
                              ),
                              li: ({ children }: any) => (
                                <li className="ml-4 list-disc ">{children}</li>
                              ),
                              link: ({ href, children }: any) => (
                                <a
                                  href={href}
                                  className=" text-blue-500 hover:underline"
                                >
                                  {children}
                                </a>
                              ),
                            }}
                          />
                        </li>
                      </ul>
                      <Link
                        className="p-3 bg-green-300 rounded-lg"
                        href={`/post/${post.slug.current}`}
                      >
                        Mas Detalle
                      </Link>
                    </div>
                  </div>
                ))}
          </article>
        </section>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
link,
    description,
      mainImage,
      slug,    
      category->{title,_id},
      price->{title},
      body
    
  }`;

  const categorys = `*[_type == "category"]{
    _id,
    title,
  }`;

  const posts = await sanityClient.fetch(query);
  const category = await sanityClient.fetch(categorys);
  return {
    props: {
      posts,
      category,
    },
  };
};

{
  /* <div className="container max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
{posts.map((post) => (
  <div>
  <Link key={post._id} href={`/post/${post.slug.current}`}>
    <div className="border rounded-lg h-full group cursor-pointer overflow-hidden  ">
      <Image
        className="h-60 w-full object-cover  group-hover:scale-105 transition-transform duration-200 ease-in-out"
        src={urlFor(post.mainImage.asset).url()!}
        width={1000}
        height={1000}
        alt={" Image Post"}
      />
      <div className=" flex h-full justify-between p-5 bg-[#ffffff63] backdrop-blur-[5px]">
        <div>
          <p className="text-lg font-bold text-green-300">
            {post.title}
          </p>
          <p className=" text-xs">{}</p>
          <PortableText
            className="text-white"
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className=" text-2xl font-bold my-5 ">
                  {...props}
                </h1>
              ),
              h2: (props: any) => (
                <h1 className=" text-xl font-bold my-5 ">
                  {...props}
                </h1>
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc ">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a
                  href={href}
                  className=" text-blue-500 hover:underline"
                >
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </div>
    </div>
  </Link>
  </div>
))}
</div> */
}
