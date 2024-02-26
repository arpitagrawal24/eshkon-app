import Image from "next/image";

interface CardProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ id, title, description, image }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-md overflow-hidden shadow-lg">
      <Image
        className="w-full"
        src={`https:${image}`}
        alt={title}
        width={400}
        height={300}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <div>Read More..</div>
      </div>
    </div>
  );
};

export default Card;
