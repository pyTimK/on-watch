import GoogleMapReact from "google-map-react";
import { MutableRefObject, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../page";
import Header from "@/components/custom/Header";

interface MainPageProps {
  divRef: MutableRefObject<HTMLDivElement | null>;
}

const MainPage: React.FC<MainPageProps> = ({ divRef }) => {
  const { location, myUser } = useContext(GlobalContext);
  const [marker, setMarker] = useState<any>();

  const defaultCetner = {
    lat: parseFloat(location?.latitude ?? "14.610535"),
    lng: parseFloat(location?.longitude ?? "121.004880"),
  };

  useEffect(() => {
    if (marker) {
      marker.setPosition(defaultCetner);
      // console.log(marker.position.lat());
    }
  }, [marker, defaultCetner]);

  return (
    <div
      ref={divRef}
      style={{
        width: "100%",
        // height: "100vh",
        // maxWidth: "700px",
        // border: "1px solid black",
      }}
    >
      <Header />
      <GoogleMapReact
        // key={`${readingData.geo_lat}-${readingData.geo_long}-${readingData.geo_radius}-${readingData.lat}-${readingData.long}`}
        bootstrapURLKeys={{ key: "AIzaSyAzPN7p1Nx8VgwDWN7QmheKnvAI4Bov-X8" }}
        defaultCenter={defaultCetner}
        center={defaultCetner}
        defaultZoom={15}
        style={{ width: "100%", height: "100%", position: "relative" }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
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
          setMarker(
            new maps.Marker({
              position: { lat: defaultCetner.lat, lng: defaultCetner.lng },
              map,
              title: location?.name,
            })
          );
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
    </div>
  );
};

export default MainPage;
