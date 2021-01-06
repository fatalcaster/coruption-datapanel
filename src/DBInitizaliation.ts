import {
    Configuration,
    Connection,
    EntityManager,
    IDatabaseDriver,
    MikroORM,
    Options,
} from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config";

type Cfg = {
    config:
        | Options<IDatabaseDriver<Connection>>
        | Configuration<IDatabaseDriver<Connection>>
        | undefined;
};
class DB {
    static orm: MikroORM;
    public static em: EntityManager<any> &
        EntityManager<IDatabaseDriver<Connection>>;

    public static async initialize(configs: Cfg = { config: mikroConfig }) {
        DB.orm = await MikroORM.init(configs.config);
        DB.em = DB.orm.em;
    }
}

export default DB;
