import { useRoutes } from "raviger";
import Home from "../components/Home";
import About from "../components/About";
import AppContainer from "../components/AppContainer";
import { Forms } from "../components/Forms";
import Form from "../components/Forms/Form";
import Preview from "../components/Preview/Preview";
import PreviewField from "../components/Preview/PreviewField";
const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/forms": () => <Forms />,
  "/forms/:id": ({ id }: { id: string }) => <Form id={Number(id)} />,
  "/preview/:id": ({ id }: { id: string }) => <Preview id={Number(id)} />,
  "/preview/:id/:fieldId": ({
    id,
    fieldId,
  }: {
    id: string;
    fieldId: string;
  }) => <PreviewField id={Number(id)} fieldId={Number(fieldId)} />,
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
