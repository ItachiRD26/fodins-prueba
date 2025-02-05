import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialProps {
  name: string;
  role: string;
  quote: string;
  image: string;
}

export const Testimonial: React.FC<TestimonialProps> = ({ name, role, quote, image }) => {
  return (
    <Card className="shadow-lg p-6 flex flex-col items-center text-center">
      <Image
        src={image}
        alt={name}
        width={80}
        height={80}
        className="rounded-full mb-4"
      />
      <CardContent>
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
        <p className="mt-4 text-gray-700 italic">"{quote}"</p>
      </CardContent>
    </Card>
  );
};
