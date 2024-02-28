"use client";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import Card from "../components/Card";
import { createClient } from "contentful";
import { loader } from "@/lib/features/loaderSlice";
import contentfulConfig from "@/utils/contentfulConfig";

export default function Home() {
  const { mode } = useSelector((state: RootState) => state.darkmode);
  const { isloading } = useSelector((state: RootState1) => state.loader);
  const dispatch = useDispatch();

  const client = createClient(contentfulConfig);
  const [cards, setCards] = useState([]);

  interface rawItem {
    sys: {
      id: string;
    };
    fields: {
      title: string;
      description: string;
      image: {
        fields: {
          file: {
            url: string;
          };
        };
      };
    };
  }

  interface Item {
    id: string;
    title: string;
    description: string;
    image: string;
  }

  interface RootState {
    darkmode: {
      mode: boolean;
    };
  }

  interface RootState1 {
    loader: {
      isloading: boolean;
    };
  }

  const cleanUp = useCallback((rawData: any) => {
    const cleanUpData = rawData.map((item: rawItem) => {
      const { sys, fields } = item;
      const { id } = sys;
      const title = fields.title;
      const description = fields.description;
      const image = fields.image.fields.file.url;
      const updatedData: Item = { id, title, description, image };
      // console.log(updatedData);
      return updatedData;
    });
    setCards(cleanUpData);
  }, []);

  const fetchCards = useCallback(async () => {
    dispatch(loader(true));

    try {
      const response = await client.getEntries({
        content_type: "eshkonApp",
      });
      const responseData = response.items;
      // console.log(responseData);

      if (responseData) {
        cleanUp(responseData);
      } else {
        setCards([]);
      }
      dispatch(loader(false));
    } catch (error) {
      console.error("Error fetching Contentful data:", error);
      dispatch(loader(false));
    }
  }, [cleanUp]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return (
    <main
      className={`flex flex-col items-center justify-center min-h-screen p-8 ${
        mode ? "bg-gray-800" : "bg-white text-black"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isloading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              className="w-64 h-64 bg-gray-300 rounded-lg animate-pulse"
              layoutId={`card-${index}`}
            ></motion.div>
          ))
        ) : (
          cards.map((card: Item, index) => (
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
              image={card.image}
              id={card.id}
            />
          ))
        )}
      </div>
    </main>
  );
}
