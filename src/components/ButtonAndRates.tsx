export default function ButtonAndRates() {
  return (
    <div className=" w-[100%] grid grid-cols-2 gap-[12%] items-center">
      <div>
        <button className=" bg-[#FDDAEF] text-white hover:bg-[#E70083] w-full p-2 rounded-3xl font-semibold">
          Continue
        </button>
      </div>
      <div className="grid grid-cols-4">
        <div className="grid grid-rows-1">
          <span className=" text-xs text-zinc-500">Current Rate</span>
          <div>1.3637</div>
        </div>
        <div className="grid grid-rows-1">
          <span className=" text-xs text-zinc-500">Today's Change</span>
          <div>0.000058</div>
        </div>
      </div>
    </div>
  );
}
