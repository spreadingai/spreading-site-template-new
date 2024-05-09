import Test1 from "./test1.mdx";

function CustomH2({ children }) {
  return <h2 style={{ color: "blue", fontSize: "100px" }}>{children}</h2>;
}

const overrideComponents = {
  h2: CustomH2,
};

export default function Test5() {
  return (
    <div>
      Test5 Page
      <Test1 components={overrideComponents} />
    </div>
  );
}
