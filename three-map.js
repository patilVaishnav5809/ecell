// 3D Startup Ecosystem Map
const startupMap = document.getElementById('startupMap3D');

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x121212);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    startupMap.clientWidth / startupMap.clientHeight,
    0.1,
    1000
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(startupMap.clientWidth, startupMap.clientHeight);
startupMap.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x00ffaa, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Startup Nodes
const startups = [
    { name: "TechGenius", category: "AI", x: -2, y: 1, z: 0 },
    { name: "MediCare", category: "Health", x: 1, y: -1, z: 0 },
    { name: "EduPlus", category: "EdTech", x: 0, y: 2, z: 0 },
    { name: "GreenSolutions", category: "Sustainability", x: 2, y: 0, z: -1 }
];

const nodeGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const nodeMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x00ffaa,
    emissive: 0x00aa77,
    emissiveIntensity: 0.5,
    specular: 0x111111,
    shininess: 30
});

const nodes = [];
startups.forEach(startup => {
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
    node.position.set(startup.x, startup.y, startup.z);
    node.userData = startup;
    scene.add(node);
    nodes.push(node);
});

// Connections between nodes
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffaa, opacity: 0.3, transparent: true });

for (let i = 0; i < startups.length; i++) {
    for (let j = i + 1; j < startups.length; j++) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(startups[i].x, startups[i].y, startups[i].z),
            new THREE.Vector3(startups[j].x, startups[j].y, startups[j].z)
        ]);
        const line = new THREE.Line(geometry, lineMaterial);
        scene.add(line);
    }
}

// Raycaster for interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredNode = null;

function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections
    const intersects = raycaster.intersectObjects(nodes);

    if (intersects.length > 0) {
        if (hoveredNode !== intersects[0].object) {
            if (hoveredNode) {
                hoveredNode.scale.set(1, 1, 1);
            }
            hoveredNode = intersects[0].object;
            hoveredNode.scale.set(1.5, 1.5, 1.5);
            
            // Show startup info
            showStartupInfo(hoveredNode.userData);
        }
    } else {
        if (hoveredNode) {
            hoveredNode.scale.set(1, 1, 1);
            hoveredNode = null;
            hideStartupInfo();
        }
    }
}

function showStartupInfo(startup) {
    const startupList = document.querySelector('.startup-list');
    startupList.innerHTML = `
        <div class="startup-info">
            <h3>${startup.name}</h3>
            <p>Category: ${startup.category}</p>
            <p>Founded: 2022</p>
            <p>Status: Active</p>
            <a href="#" class="btn btn-primary">Learn More</a>
        </div>
    `;
    startupList.style.opacity = '1';
}

function hideStartupInfo() {
    document.querySelector('.startup-list').style.opacity = '0';
}

// Animation
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate nodes slightly
    nodes.forEach(node => {
        node.rotation.x += 0.005;
        node.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
}

// Event Listeners
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('resize', () => {
    camera.aspect = startupMap.clientWidth / startupMap.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(startupMap.clientWidth, startupMap.clientHeight);
});

animate();