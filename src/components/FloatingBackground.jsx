import React from 'react';
import { motion } from 'framer-motion';

const floatingIcons = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  '/Jenkins.png',
  '/Argocd.png',
  'https://raw.githubusercontent.com/aws-samples/aws-icons-for-plantuml/master/dist/Storage/SimpleStorageService.png',
  'https://raw.githubusercontent.com/goharbor/harbor/master/docs/img/harbor-logo-color.png',
  'https://raw.githubusercontent.com/k3s-io/k3s/master/docs/assets/k3s-logo-light.svg',
  'https://raw.githubusercontent.com/lensapp/lens/master/static/logo.png',
  'https://raw.githubusercontent.com/termux/termux-app/master/app/src/main/res/drawable-nodpi/ic_launcher.png',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vault/vault-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg'
];

const FloatingBackground = React.memo(() => {
  const icons = React.useMemo(() => floatingIcons.map((icon, i) => ({
    src: icon,
    initialX: `${(i % 5) * 20 + Math.random() * 10}vw`,
    initialY: `${Math.floor(i / 4) * 20 + Math.random() * 10}vh`,
    duration: 35 + Math.random() * 45,
    pathX: [Math.random() * 100 + 'vw', Math.random() * 100 + 'vw'],
    pathY: [Math.random() * 100 + 'vh', Math.random() * 100 + 'vh'],
    rotate: Math.random() * 360,
    size: 35 + Math.random() * 35 // Varied sizes
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((item, i) => (
        <motion.img
          key={i}
          src={item.src}
          className="absolute opacity-[0.1] grayscale hover:grayscale-0 transition-all duration-500"
          style={{ width: item.size, height: item.size }}
          initial={{ x: item.initialX, y: item.initialY, rotate: item.rotate }}
          animate={{ 
            x: [item.initialX, ...item.pathX, item.initialX], 
            y: [item.initialY, ...item.pathY, item.initialY],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: item.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
});

export default FloatingBackground;
