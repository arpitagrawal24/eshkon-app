import Link from "next/link";
import Image from "next/image";

const getData = async () => {
  const response = await fetch("https://api.imgflip.com/get_memes");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  const memes = data.data.memes;
  const randomIndex = Math.floor(Math.random() * memes.length);

//   console.log(memes[randomIndex]);

  return memes[randomIndex];
};

const NotFound = async () => {
  const randomMeme = await getData();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h2 className="text-4xl font-bold text-red-600 mb-4">Not Found</h2>
      <p className="text-gray-600 mb-4">
        Could not find the requested resource
      </p>

      {randomMeme && (
        <div className="mb-4">
          <Image
            src={randomMeme.url}
            width={randomMeme.width}
            height={randomMeme.height}
            alt="Random Meme"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}

      <Link href="/">
        <div className="text-blue-500 hover:underline">Return Home</div>
      </Link>
    </div>
  );
};

export default NotFound;
