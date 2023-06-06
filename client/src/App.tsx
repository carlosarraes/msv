import PostCreate from "./components/PostCreate";
import PostList from "./components/PostList";

function App() {
  return (
    <main className="w-screen flex flex-col justify-center gap-4 items-center">
      <section className="flex flex-col w-full justify-center items-center">
        <h1 className="text-2xl">Create Post</h1>
        <PostCreate />
      </section>
      <hr className="w-full" />
      <section className="flex flex-col w-full justify-center items-center">
        <h2 className="text-xl">Posts List</h2>
        <PostList />
      </section>
    </main>
  );
}

export default App;
