import GoogleMapReact from "google-map-react";
import {
  MutableRefObject,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Header from "@/components/custom/Header";
import { GlobalContext } from "../wrappers/GlobalWrapper";
import LocationBottomSheet from "@/components/custom/LocationBottomSheet";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = ({}) => {
  const { watch, myUser } = useContext(GlobalContext);
  const [marker, setMarker] = useState<any>();
  const [maps, setMaps] = useState<any>();
  const [openLocationBS, setOpenLocationBS] = useState(false);

  const [defaultCenter, setDefaultCenter] = useState({
    lat: 14.610535,
    lng: 121.00488,
  });

  useEffect(() => {
    if (marker && watch?.latitude && watch?.longitude) {
      const defaultCenter = {
        lat: parseFloat(watch.latitude),
        lng: parseFloat(watch.longitude),
      };
      setDefaultCenter(defaultCenter);
      marker.setPosition(defaultCenter);
    }
  }, [marker, watch?.latitude, watch?.longitude]);

  useEffect(() => {
    if (marker && maps) {
      // console.log(marker);
      marker.setIcon({
        url:
          watch?.emergency === "1"
            ? "/images/redmarker.svg"
            : "/images/marker.svg",
        scaledSize: new maps.Size(40, 40), // scaled size
        origin: new maps.Point(0, 0), // origin
        anchor: new maps.Point(0, 0), // anchor
      });
    }
  }, [marker, maps, watch?.emergency]);

  // useLayoutEffect(() => {
  //   if (typeof window !== "undefined") {
  //     //get an image with src="aa.png"
  //     const imgEl = document.querySelector("img[src='/images/marker.svg']");
  //     console.log("imgEl");
  //     console.log(imgEl);
  //     if (!imgEl) return;
  //     const parentEl = imgEl.parentElement;
  //     parentEl?.classList.add("my-pulse");
  //   }
  // }, [marker]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Header />
      <GoogleMapReact
        // key={`${watch?.emergency}`}
        // key={`${readingData.geo_lat}-${readingData.geo_long}-${readingData.geo_radius}-${readingData.lat}-${readingData.long}`}
        bootstrapURLKeys={{ key: "AIzaSyAzPN7p1Nx8VgwDWN7QmheKnvAI4Bov-X8" }}
        defaultCenter={{ lat: 14.610535, lng: 121.00488 }}
        center={defaultCenter}
        defaultZoom={15}
        style={{ width: "100%", height: "100%", position: "relative" }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          setMaps(maps);
          // const bounds = new maps.LatLngBounds();
          // bounds.extend(centerCoordinates);
          // bounds.extend(deviceCoordinates);
          // map.fitBounds(bounds);
          // new maps.Circle({
          //   strokeColor: Colors.darker_primary,
          //   strokeOpacity: 0.8,
          //   strokeWeight: 2,
          //   fillColor: Colors.light_primary,
          //   fillOpacity: 0.3,
          //   map,
          //   center: { lat: readingData.geo_lat, lng: readingData.geo_long },
          //   radius: readingData.geo_radius,
          // });
          // Add on click listener
          // new maps.event.addListener(map, "click", (event: any) => {
          //   // addMarker(event.latLng, map, maps);
          //   console.log(event.latLng.lat(), event.latLng.lng());
          // });
          // Display barangay markers

          const new_marker = new maps.Marker({
            position: { lat: defaultCenter.lat, lng: defaultCenter.lng },
            map,
            title: watch?.name,
            icon: {
              url: "/images/marker.svg", // url
              scaledSize: new maps.Size(40, 40), // scaled size
              origin: new maps.Point(0, 0), // origin
              anchor: new maps.Point(0, 0), // anchor
            },
            clickable: true,
          });
          setMarker(new_marker);

          maps.event.addDomListener(new_marker, "click", function () {
            setOpenLocationBS(!openLocationBS);
          });
          // console.log(`New Marker: ${defaultCetner}`);
          // new maps.Marker({
          //   position: { lat: readingData.lat, lng: readingData.long },
          //   map,
          //   title: "Device Location",
          // });
        }}
      >
        {/* <MyMarker
            key={`${defaultCetner.lat}-${defaultCetner.lng}`}
            lat={defaultCetner.lat}
            lng={defaultCetner.lng}
          /> */}
      </GoogleMapReact>
      <LocationBottomSheet
        open={openLocationBS}
        onClose={() => setOpenLocationBS(false)}
      />
    </div>
  );
};

export default MainPage;
