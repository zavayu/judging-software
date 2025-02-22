
export default function ProjectList() {
  return (
    <div className="w-[85%] h-[65vh] justify-self-center border-4 border-[#383838] rounded-badge flex flex-row grid-rows-3 justify-between p-10 text-Secondary">
      {/*Ready to be Judged:*/}
      <div className="w-1/4">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl">
            Ready to be Judged
          </h2>
          <h3 className="text-xl">
            10
          </h3>
        </div>
      </div>
      <span className="border-r-2 border-[#383838]"></span>

      {/*Judging in Progress:*/}
      <div className="w-1/4">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl">
            Judging in Progress
          </h2>
          <h3 className="text-xl">
            10
          </h3>
        </div>
      </div>
      <span className="border-r-2 border-[#383838]"></span>

      {/*Judging Completed:*/}
      <div className="w-1/4">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl">
            Judging Completed
          </h2>
          <h3 className="text-xl">
            10
          </h3>
        </div>
      </div>
    </div>
  )
}