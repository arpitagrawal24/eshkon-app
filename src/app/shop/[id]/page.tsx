"use client";
import { createClient, Entry } from "contentful";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import React from "react";
import Image from "next/image";

interface Data {
  title: string;
  description: string;
  image: {
    fields: {
      file: {
        url: string;
      };
      title: string;
    };
  };
}

interface Params {
  id: string;
}

const getData = async (id: string) => {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
  });

  try {
    const res: Entry<Data> = await client.getEntry(id);
    return res.fields;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const CardPage = ({ params }: { params: Params }) => {
  const [data, setData] = useState<Data | null>(null);
  const { id } = params;
  const { mode } = useSelector((state: RootState) => state.darkmode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getData(id);

        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // console.log(data);

  return (
    <div
      className={`container mx-auto flex flex-col items-center justify-center min-h-screen p-8 ${
        mode ? "bg-gray-800" : "bg-white text-black"
      }`}
    >
      {data ? (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Image
            src={`https:${data.image.fields.file.url}`}
            width={400}
            height={300}
            alt={data.image.fields.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
            <p className="text-gray-600">{data.description}</p>
          </div>
        </div>
      ) : (
        <div className="animate-pulse bg-gray-300 h-96 w-full rounded-lg" />
      )}
    </div>
  );
};

export default CardPage;
