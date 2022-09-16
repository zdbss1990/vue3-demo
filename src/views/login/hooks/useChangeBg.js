import {
    reactive,
    ref
} from "vue";
export default (function useChangeBg() {
    const bgList = reactive([
        "#d9cdcd",
        "#41454e",
        "#75787a",
        "#bd9e70",
        "#bcd1e7",
    ]);
    const activeBg = ref('#d9cdcd')
    const changeBg = (item) => {
        if (activeBg.value == item) return
        activeBg.value = item
    }
    return {
        bgList,
        changeBg,
        activeBg,
    }
})()