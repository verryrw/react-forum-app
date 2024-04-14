import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Badge from "../components/Badge";
import ButtonBack from "../components/ButtonBack";

export default function ThreadDetail() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(params.threadId);
  }, [params]);

  function onBackHandler() {
    navigate("/", { replace: true });
  }

  return (
    <div className="p-4">
      <h4 className="mb-4">
        <ButtonBack onBackHandler={onBackHandler} />
      </h4>
      <section>
        <Badge>#Test</Badge>
        <h1 className="mt-2 text-3xl font-semibold">Title threadnya nih</h1>
        <h2 className="mt-2 text-lg">Description</h2>
      </section>
    </div>
  );
}
