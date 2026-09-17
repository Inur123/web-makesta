import DashboardController from './DashboardController'
import KegiatanController from './KegiatanController'
import MateriController from './MateriController'
import PesertaController from './PesertaController'
import Settings from './Settings'

const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    KegiatanController: Object.assign(KegiatanController, KegiatanController),
    MateriController: Object.assign(MateriController, MateriController),
    PesertaController: Object.assign(PesertaController, PesertaController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers