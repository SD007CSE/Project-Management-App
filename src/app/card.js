
import Openweather from "./weather/page";
// import Weather from "./weather/weather";
import salesData from "./salesData.json"
import Sales from "./sales";
import Project from "./project/page";

export default function Cards() {

    return (
        <div className=" flex  flex-wrap">
            <div class=" rounded shadow-lg pl-14 grow h-150">
                
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Project Analytics</div>
                    <Sales/>
                </div>
            </div>
            <div class="max-w-sm rounded overflow-hidden shadow-lg pl-14">
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Today's Weather
                    </div>
                    <div><Openweather/></div>
                </div>
            </div>
            <div class="max-w-sm rounded overflow-hidden shadow-lg pl-14">
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Project Panel</div>
                </div>
                <Project/>
            </div>
            <div class="max-w-sm rounded overflow-hidden shadow-lg pl-14">
                <img class="w-full" src="https://d33v4339jhl8k0.cloudfront.net/docs/assets/588089eddd8c8e484b24e90a/images/5ff342ab66df373cab705f93/file-FzOfq91cTi.png" alt="Sunset in the mountains" />
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Task Panel</div>
                </div>
            </div>
            
        </div>
    );
}