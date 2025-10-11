import React, {useRef} from 'react'
import {PresentationControls} from "@react-three/drei";
import MacBookModel16 from "../models/Macbook-16.jsx";
import MacBookModel14 from "../models/Macbook-14.jsx";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group, opacity) => {
    if(!group) return;

    group.traverse(child => {
        if(child.isMesh) {
            child.material.transparent = true;
            gsap.to(child.material, {duration: ANIMATION_DURATION, opacity})
        }
    })
}

const moveGroup = (group, x) => {
    if(!group) return;

    gsap.to(group.position, {x, duration: ANIMATION_DURATION
    }
    )
}

const ModelSwitcher = ({scale, isMobile}) => {
    const smallMacBookRef = useRef();
    const largeMacBookRef = useRef();

    const showLargeMacBook = scale === 0.08 || scale === 0.05;

    useGSAP(() => {
        if(showLargeMacBook) {
            moveGroup(smallMacBookRef.current, -OFFSET_DISTANCE);
            moveGroup(largeMacBookRef.current, 0);

            fadeMeshes(smallMacBookRef.current, 0);
            fadeMeshes(largeMacBookRef.current, 1);
        } else{
            moveGroup(smallMacBookRef.current, 0);
            moveGroup(largeMacBookRef.current, OFFSET_DISTANCE);

            fadeMeshes(smallMacBookRef.current, 1);
            fadeMeshes(largeMacBookRef.current, 0);
        }
    }, [scale])

    const controlConfig = {
        snap: true,
        speed: 1,
        zoom: 1,
        // polar: [0, Math.PI / 2],
        azimuth: [-Infinity, Infinity],
        config: {
            mass: 1,
            tension: 100,
            friction: 10,
            precision: 0.0001,
        },
    }
    return (
        <>
            <PresentationControls {...controlConfig}>
                <group ref={largeMacBookRef}>
                    <MacBookModel16 scale={isMobile ? 0.05 : 0.08}/>
                </group>
            </PresentationControls>

            <PresentationControls {...controlConfig}>
                <group ref={smallMacBookRef}>
                    <MacBookModel14 scale={isMobile ? 0.03 : 0.06}/>
                </group>
            </PresentationControls>
        </>
    )
}
export default ModelSwitcher
