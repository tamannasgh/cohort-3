import OTP from './components/OTP';

function App() {

  return (
    <>
      <div className="bg-primary-bg text-primary-text min-h-screen flex flex-col items-center text-center">
        <h2 className="text-xl my-20"><span className='text-secondary-text'>Webinar</span>.gg</h2>
        <div>
          <h1 className="text-2xl font-semibold mb-14">Check Your Email For A Code</h1>
          <p className="text-sm font-extralight">Please enter the verification code sent to your email id prabhleen@gmail.com</p>
          <OTP boxesNo={5} />
        </div>
      </div>
    </>
  );
}

export default App;
