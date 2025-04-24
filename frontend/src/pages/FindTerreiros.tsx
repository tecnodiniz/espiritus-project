import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Badge } from "@/components/ui/badge";

export default function FindTerreiros() {
  const API_KEY = import.meta.env.VITE_MAPS_KEY;
  return (
    <>
      <div className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 space-y-6">
          <div className="flex flex-col space-y-4">
            <Badge className="w-fit px-4 py-1.5 text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/40">
              Terreiros
            </Badge>

            <h1 className="text-3xl md:text-4xl font-bold text-purple-900 dark:text-white">
              Localize Terreiros
            </h1>
            <div className="bg-purple-50 dark:bg-gray-800/50 rounded-xl p-6 border border-purple-100 dark:border-gray-800">
              <APIProvider apiKey={API_KEY}>
                <Map
                  style={{ width: "100%", height: "600px" }}
                  defaultCenter={{
                    lat: -23.136925085691104,
                    lng: -46.56518157116394,
                  }}
                  defaultZoom={15}
                  gestureHandling={"greedy"}
                  disableDefaultUI={true}
                />

                <Marker
                  position={{
                    lat: -23.136925085691104,
                    lng: -46.56518157116394,
                  }}
                />
                <Marker
                  position={{
                    lat: -23.12766732301035,
                    lng: -46.55320708930031,
                  }}
                />
                <Marker
                  position={{
                    lat: -23.132472950515755,
                    lng: -46.56192159632998,
                  }}
                />
              </APIProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
