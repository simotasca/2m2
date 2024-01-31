import { translateRoute } from "@/lib/client/lang";
import { useRouter } from "next/navigation";

export default function useNavigate() {
  const router = useRouter();

  const navigate = (href: string) => {
    router.push(translateRoute({ href }));
  };
  return { navigate };
}
