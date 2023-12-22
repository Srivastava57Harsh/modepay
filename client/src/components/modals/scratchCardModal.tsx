//@ts-ignore
import ScratchCard from "react-scratchcard";
import React from "react";
import Confetti from "react-confetti";

interface ScratchCardMainProps {
  value: string;
  onClose: any;
}

const ScratchCardMain: React.FC<ScratchCardMainProps> = ({
  value,
  onClose,
}) => {
  const [completed, setCompleted] = React.useState(false);
  const [modal, setModal] = React.useState(true);

  const handleCeleb = () => {
    return <Confetti width={1000} height={2000} />;
  };

  const settings = {
    width: 300,
    height: 300,
    image: "/scratch.png",
    finishPercent: 50,
    onComplete: () => {
      setCompleted(true);
      console.log("The card is now clear!");
      handleCeleb();
      setTimeout(() => {
        onClose({
          target: {
            id: "container",
          },
        });
      }, 3000);
    },
  };

  return (
    <>
      {modal ? (
        <div
          id="container"
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-20"
          // onClick={() => {
          //   setModal(false);
          // }}
        >
          <div className="flex items-center justify-center h-screen ">
            {completed ? (
              <Confetti width={window.innerWidth} height={window.innerHeight} />
            ) : null}

            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#" className="flex items-center justify-center py-10">
                <ScratchCard {...settings}>
                  <h5 className="mt-28 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white text-center h-full flex items-center justify-center">
                    {value.substring(0, 8)} ETH
                  </h5>
                  <h5 className="mb-28 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white text-center h-full flex items-center justify-center">
                    Cashback
                  </h5>
                </ScratchCard>
              </a>

              {!completed ? (
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white flex just-center items-center">
                      Congratulations! You WON... Scratch the above card to
                      reveal cashback amount earned!
                    </h5>
                  </a>

                  <div className="flex items-center justify-between mt-12">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ModePay
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center mt-4">
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 -mt-24 mb-8"
                    onClick={() => {
                      setModal(false);
                    }}
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ScratchCardMain;
