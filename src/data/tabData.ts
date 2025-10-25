import { DashboardIcon, FileIcon, MoreIcon, WatchIcon } from "@/assets/svg";
import { TabConfig } from "@/types";

export const tabConfigs: TabConfig[] = [
    {
        name: 'Dashboard',
        label: 'Dashboard',
        icon: DashboardIcon,
        enabled: false,
    },
    {
        name: 'Watch',
        label: 'Watch',
        icon: WatchIcon,
        enabled: true,
    },
    {
        name: 'MediaLibrary',
        label: 'Media Library',
        icon: FileIcon,
        enabled: false,
    },
    {
        name: 'More',
        label: 'More',
        icon: MoreIcon,
        enabled: false,
    },
]