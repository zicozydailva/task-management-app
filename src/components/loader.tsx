export default function Loader() {
  return (
    <div className="flex h-[500px] w-full flex-1 items-center justify-center">
      <h1>loading...</h1>
      {/* <img
        src={}
        alt="Loading"
        height={150}
        width={150}
        className="animate-pulse duration-100"
      /> */}
    </div>
  );
}

export const PageLoader = () => (
  <div
    className="flex flex-1 items-center justify-center"
    style={{ width: "100%", height: `calc(100vh - 200px)` }}
  >
    <h1>loading...</h1>

    {/* <img
      src={}
      alt="Loading"
      height={100}
      width={100}
      className="animate-pulse duration-100"
    /> */}
  </div>
);
