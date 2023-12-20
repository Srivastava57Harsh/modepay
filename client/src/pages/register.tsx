import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Register() {
  return (
    <>
      <div
        className="min-h-screen bg-gray-100 text-gray-900 flex justify-center"
        style={{ backgroundImage: "url('/bg.jpg')", backgroundSize: "cover" }}
      >
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-bold">
                Welcome to ModePay 🙏
              </h1>
              <div className="w-full flex-1 mt-4">
                <div className="flex flex-col items-center"></div>

                <div className="my-8 border-b text-center"></div>

                <div className="mx-auto max-w-xs">
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="username"
                    placeholder="Username"
                  />
                  <div className="mt-5 flex items-center justify-center">
                    <ConnectButton />
                  </div>
                  <div className="flex items-center justify-center">
                    <button className="mt-5 tracking-wide font-semibold  bg-gray-900 text-gray-100 px-7 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      <svg
                        className="w-4 h-5 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">Register</span>
                    </button>
                  </div>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by templatana's
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>
                    and its
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-blue-200 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
