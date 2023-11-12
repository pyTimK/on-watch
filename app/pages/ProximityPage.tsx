import HeaderSettings from "@/components/custom/HeaderSettings";
import Switch from "@/components/templates/Switch";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../wrappers/GlobalWrapper";
import FirebaseHelper from "@/classes/FirebaseHelper";
import GoogleMapReact from "google-map-react";
import LocationBottomSheet from "@/components/custom/LocationBottomSheet";
import MyInput from "@/components/templates/MyInput";
import { useInputField } from "@/hooks/useInputField";
import { Colors } from "@/styles/styles";

interface ProximityPageProps {}

const ProximityPage: React.FC<ProximityPageProps> = ({}) => {
  const [openLocationBS, setOpenLocationBS] = useState(false);
  const { proximity } = useContext(GlobalContext);
  const [marker, setMarker] = useState<any>();
  const [circle, setCircle] = useState<any>();
  const [centerCircle, setCenterCircle] = useState({
    lat: 14.610535,
    lng: 121.00488,
  });

  const distanceInput = useInputField((distance) => [
    [
      distance !== undefined && parseFloat(distance!) <= 0,
      "Distance must be greater than 0 km",
    ],
    [
      distance !== undefined && parseFloat(distance!) > 100000,
      "Distance must be less than 100, 000 km",
    ],
  ]);

  //! UPDATE CIRCLE MARKER POSITION
  useEffect(() => {
    if (marker && proximity?.lat && proximity?.lng) {
      const center = { lat: proximity.lat, lng: proximity.lng };
      setCenterCircle(center);
      marker.setPosition(center);
    }
  }, [marker, proximity?.lat, proximity?.lng]);

  //! UPDATE CIRCLE POSITION
  useEffect(() => {
    if (circle && centerCircle && proximity?.distance_limit_m) {
      circle.setRadius(proximity.distance_limit_m);
      circle.setCenter(centerCircle);
    }
  }, [circle, proximity?.distance_limit_m, centerCircle]);

  //! DISTANCE LIMIT UPDATE
  const updateDistanceLimit = () => {
    if (distanceInput.verify()) {
      const value = distanceInput.getValue();
      if (!value) return;
      FirebaseHelper.Proximity.update(proximity, {
        distance_limit_m: parseFloat(value),
      });
    }
  };

  return (
    <div className="flex flex-col pt-1 h-full">
      <div className="flex flex-col px-5">
        {/* //! HEADER */}
        <HeaderSettings title="Proximity Controller" />

        <SettingsBlock>
          {/* //! PROXIMITY ALARM */}
          <SettingsRow title="Proximity Alarm">
            <Switch
              checked={proximity?.proximity_alarm}
              onChange={(e) =>
                FirebaseHelper.Proximity.update(proximity, {
                  proximity_alarm: e.target.checked,
                })
              }
            />
          </SettingsRow>

          {/* //! DISTANCE LIMIT */}
          <SettingsRow title="Distance Limit">
            <div className="flex items-center gap-2">
              <MyInput
                type="number"
                inputField={distanceInput}
                defaultValue={`${proximity?.distance_limit_m}`}
                className="w-24 text-end bg-transparent py-1 px-1"
                onBlur={updateDistanceLimit}
                onChange={updateDistanceLimit}
              />
              <p className="text-sm">m</p>
            </div>
          </SettingsRow>
        </SettingsBlock>
      </div>

      {/* //! DISTANCE LIMIT */}

      {/* //! MAP */}
      <div className="w-full grow border-t border-zinc-400">
        <GoogleMapReact
          // key={`${watch?.emergency}`}
          // key={`${readingData.geo_lat}-${readingData.geo_long}-${readingData.geo_radius}-${readingData.lat}-${readingData.long}`}
          bootstrapURLKeys={{
            key: "AIzaSyAzPN7p1Nx8VgwDWN7QmheKnvAI4Bov-X8",
          }}
          defaultCenter={{ lat: 14.610535, lng: 121.00488 }}
          center={centerCircle}
          defaultZoom={12}
          style={{ width: "100%", height: "100%", position: "relative" }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            // const bounds = new maps.LatLngBounds();
            // bounds.extend(centerCoordinates);
            // bounds.extend(deviceCoordinates);
            // map.fitBounds(bounds);
            const new_circle = new maps.Circle({
              strokeColor: Colors.darker_primary,
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: Colors.light_primary,
              fillOpacity: 0.3,
              map,
              center: centerCircle,
              radius: proximity?.distance_limit_m,
            });
            setCircle(new_circle);
            // Add on click listener
            // new maps.event.addListener(map, "click", (event: any) => {
            //   // addMarker(event.latLng, map, maps);
            //   console.log(event.latLng.lat(), event.latLng.lng());
            // });
            // Display barangay markers

            const new_marker = new maps.Marker({
              position: centerCircle,
              map,
              icon: {
                url: "/images/center_marker.svg", // url
                scaledSize: new maps.Size(30, 30), // scaled size
                origin: new maps.Point(0, 0), // origin
                anchor: new maps.Point(15, 15), // anchor
              },
              clickable: true,
              draggable: true,
            });
            setMarker(new_marker);

            //! On click Marker
            maps.event.addDomListener(new_marker, "click", function () {
              setOpenLocationBS((open) => !open);
            });

            //! On drag end Marker
            maps.event.addListener(new_marker, "dragend", function () {
              // const new_center = {
              //   lat: new_marker.getPosition().lat(),
              //   lng: new_marker.getPosition().lng(),
              // };
              // setCenter(new_center);
              FirebaseHelper.Proximity.update(proximity, {
                lat: new_marker.getPosition().lat(),
                lng: new_marker.getPosition().lng(),
              });
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
      </div>
      <LocationBottomSheet
        open={openLocationBS}
        lat={centerCircle.lat}
        lng={centerCircle.lng}
        title="Center Position"
        onClose={() => setOpenLocationBS(false)}
      />
    </div>
  );
};

//! SETTINGS BLOCK
interface SettingsBlockProps {
  title?: string;
  children: React.ReactNode;
}

const SettingsBlock: React.FC<SettingsBlockProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-5 pb-10">
      {title && <p className="text-lg font-semibold text-zinc-500">{title}</p>}
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
};

//! SETTINGS ROW
interface SettingsRowProps {
  children: React.ReactNode;
  title: string;
}

const SettingsRow: React.FC<SettingsRowProps> = ({ children, title }) => {
  return (
    <motion.div className="flex items-center justify-between px-3 py-3 bg-white rounded-xl">
      <p className="text text-zinc-800">{title}</p>
      {children}
    </motion.div>
  );
};

export default ProximityPage;
