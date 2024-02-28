import Link from "next/link";
import { motion } from "framer-motion";

interface CardProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ id, title, description, image }) => {
  return (
    <motion.div
      className="max-w-sm mx-auto bg-white rounded-md overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        className="w-full"
        src={`https:${image}`}
        alt={title}
        width={400}
        height={300}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="px-6 py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div className="font-bold text-xl mb-2">{title}</motion.div>
        <motion.p className="text-gray-700 text-base">{description}</motion.p>
        <Link href={`/shop/${id}`}>
          <motion.div
            whileHover={{ scale: 1 }}
            className="text-blue-500 cursor-pointer"
          >
            Read More..
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Card;
