import Cards from "./card";
import Panes from "./pane";
import ProjectData from "./projectData.json"


export default async function Home() {
 



  return (
    <main class="grid">
      <div class="">
        <div class="ml-[250px]">
          <div class="justify-start text-4xl antialiased font-sans pt-10 pl-9 pb-20 ">
            <h1>Dashboard</h1>
          </div>
          <Cards />
        </div>
        <Panes />
      </div>
    </main>
  );
}
