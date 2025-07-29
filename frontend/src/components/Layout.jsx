export function Layout({ children }) {
  return (
    <>
      <div className="relative h-full w-full bg-[#030712] min-h-[100dvh] text-white overflow-hidden">
        <div className="relative z-10">{children}</div>

        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb18,#14224a08)]"></div>
      </div>
    </>
  );
}