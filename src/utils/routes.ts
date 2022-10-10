import { useRouter } from "next/router";

const RouteFunctions = (() => {
  const router = useRouter();

  const redirectToHome = () => {
    router.push("/");
  };
  const redirectToSignin = () => {
    router.push("/sign-in");
  };
  const redirectToAbout = () => {
    router.push("/about");
  };

  return {
    redirectToHome,
    redirectToSignin,
    redirectToAbout,
  };
})();

function redirectToHome() {
  RouteFunctions.redirectToHome();
}

function redirectToSignin() {
  RouteFunctions.redirectToSignin();
}

function redirectToAbout() {
  RouteFunctions.redirectToAbout();
}



export { redirectToHome, redirectToSignin, redirectToAbout};
