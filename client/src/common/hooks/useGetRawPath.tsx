import { useParams, usePathname } from "next/navigation";

// 获取page router下的router.pathname
// https://github.com/vercel/next.js/discussions/61846

function useGetRawPath() {
  const params = useParams();
  const pathname = usePathname();
  const splittedRoute = pathname.split("/");

  if (typeof params === "object" && params !== null) {
    let reconstructedPath = "";

    for (let i = 1; i < splittedRoute.length; i++) {
      const segment = splittedRoute[i];

      // Check if the segment matches any value in the params object
      const matchingKey = Object.keys(params).find(
        (key) => params[key] === segment,
      );

      if (matchingKey) {
        // Replace the segment with the dynamic segment
        reconstructedPath += `/[${matchingKey}]`;
      } else {
        // Keep the original segment
        reconstructedPath += `/${segment}`;
      }
    }

    return reconstructedPath;
  } else {
    // Params object is not present
    return pathname;
  }
}
export default useGetRawPath;
