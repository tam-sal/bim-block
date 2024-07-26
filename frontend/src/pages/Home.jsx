import NavBar from '../components/NavBar/NavBar';



const Home = () => {

  return (
    <>
      <NavBar />
      <div class="flex items-center justify-center min-h-[90vh] p-8">
        <div class="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
          <h1 class="text-3xl font-bold text-purple-700 mb-4 text-center">Welcome to Block Manager</h1>
          <p class="text-lg text-gray-700 mb-4 text-center">
            A block is more than just a unit of work—it's a structured way to track your progress and achievements. Each block is filled with data that helps you monitor your advancement. As you complete a block, its progress value reaches 100, marking a job well done!
          </p>
          <p class="text-lg text-gray-700 text-center">
            Fun fact: Blocks are inspired by real structures used in Bimtrazer, where they hold a vast amount of data. While these digital blocks are more engaging, they share the same principles of organization and tracking.
          </p>
        </div>
      </div>
    </>
  )
}

export default Home