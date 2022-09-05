import { getData } from "@/common/modules/cache/type";
import type {Type,Tag, TypeAttributes, TagAttributes } from "../models/init-models";
import init from "./utils/init";


export default init<Type|Tag, TypeAttributes|TagAttributes>(async (model, type) => {
 getData();
});

