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
import { Colors } from "@/styles/styles";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = ({}) => {
  const { watch, proximity } = useContext(GlobalContext);
  const [maps, setMaps] = useState<any>();
  const [watchMarker, setWatchMarker] = useState<any>();
  const [circleMarker, setCircleMarker] = useState<any>();
  const [circle, setCircle] = useState<any>();
  const [openLocationBS, setOpenLocationBS] = useState(false);
  const [openCircleCenterLocationBS, setOpenCircleCenterLocationBS] =
    useState(false);

  const [defaultCenter, setDefaultCenter] = useState({
    lat: 14.610535,
    lng: 121.00488,
  });
  const [centerCircle, setCenterCircle] = useState({
    lat: 14.610535,
    lng: 121.00488,
  });
  // console.log(centerCircle);

  //! UPDATE WATCH MARKER POSITION
  useEffect(() => {
    if (watchMarker && watch?.latitude && watch?.longitude) {
      const defaultCenter = {
        lat: parseFloat(watch.latitude),
        lng: parseFloat(watch.longitude),
      };
      setDefaultCenter(defaultCenter);
      watchMarker.setPosition(defaultCenter);
    }
  }, [watchMarker, watch?.latitude, watch?.longitude]);

  //! UPDATE CIRCLE MARKER POSITION
  useEffect(() => {
    if (circleMarker && proximity?.lat && proximity?.lng) {
      const center = { lat: proximity.lat, lng: proximity.lng };
      setCenterCircle(center);
      circleMarker.setPosition(center);
    }
  }, [circleMarker, proximity?.lat, proximity?.lng]);

  //! UPDATE CIRCLE POSITION
  useEffect(() => {
    if (circle && centerCircle && proximity?.distance_limit_m) {
      circle.setRadius(proximity.distance_limit_m);
      circle.setCenter(centerCircle);
    }
  }, [circle, proximity?.distance_limit_m, centerCircle]);

  //! UPDATE WATCH MARKER ICON
  useEffect(() => {
    if (watchMarker && maps) {
      // console.log(marker);
      watchMarker.setIcon({
        url:
          watch?.emergency === "1"
            ? "/images/redmarker.svg"
            : "/images/marker.svg",
        scaledSize: new maps.Size(40, 40), // scaled size
        origin: new maps.Point(0, 0), // origin
        anchor: new maps.Point(20, 20), // anchor
      });
    }
  }, [watchMarker, maps, watch?.emergency]);

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

          //! CIRCLE
          const new_circle = new maps.Circle({
            strokeColor: Colors.darker_primary,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: Colors.light_primary,
            fillOpacity: 0.08,
            map,
            center: defaultCenter,
            radius: proximity?.distance_limit_m,
          });
          setCircle(new_circle);

          //! WATCH MARKER
          const watch_marker = new maps.Marker({
            position: { lat: defaultCenter.lat, lng: defaultCenter.lng },
            map,
            title: watch?.name,
            icon: {
              url: "/images/marker.svg", // url
              scaledSize: new maps.Size(40, 40), // scaled size
              origin: new maps.Point(0, 0), // origin
              anchor: new maps.Point(20, 20), // anchor
            },
            clickable: true,
          });
          setWatchMarker(watch_marker);

          maps.event.addDomListener(watch_marker, "click", function () {
            setOpenLocationBS((open) => !open);
          });

          //! CIRCLE CENTER MARKER
          const circle_marker = new maps.Marker({
            position: centerCircle,
            map,
            icon: {
              url: "/images/center_marker.svg", // url
              scaledSize: new maps.Size(30, 30), // scaled size
              origin: new maps.Point(0, 0), // origin
              anchor: new maps.Point(15, 15), // anchor
            },
            clickable: true,
          });
          setCircleMarker(circle_marker);

          //! On click Circle Center Marker
          maps.event.addDomListener(circle_marker, "click", function () {
            setOpenCircleCenterLocationBS((open) => !open);
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
        lat={defaultCenter.lat}
        lng={defaultCenter.lng}
        title={watch !== null ? `${watch?.name}'s Position` : "Position"}
        onClose={() => setOpenLocationBS(false)}
      />
      <LocationBottomSheet
        open={openCircleCenterLocationBS}
        lat={centerCircle.lat}
        lng={centerCircle.lng}
        title="Circle Boundary Position"
        onClose={() => setOpenCircleCenterLocationBS(false)}
      />
    </div>
  );
};

export default MainPage;
