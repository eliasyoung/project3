<template>
  <div>
    <div ref="editor"></div>
    <div :innerHTML="content.html"></div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onBeforeUnmount, watch } from "vue";
// import wangEditorScript from "./wangEditorScript";
import WangEditor from "wangeditor";
import { uploadMdImage } from "@/http/article";
export default {
  name: "WangEditor",
  props: {
    editorContent: {
      type: String,
      default() {
        return "";
      },
    },
  },
  setup(props, { emit }) {
    const editor = ref();
    const content = reactive({
      html: "",
      text: "",
    });
    let instance = "";
    onMounted(() => {
      console.log(props.editorContent);
      instance = new WangEditor(editor.value);
      Object.assign(instance.config, {
        height: 600,
        onchange() {
          console.log("change");
          emit("update:editorContent", instance.txt.html());
        },
        // showLinkImg: false,
        customUploadImg: async (file, insertImgFn) => {
          const formData = new FormData();
          formData.append("file", file[0]);
          const res = await uploadMdImage(formData);
          insertImgFn(res.data.url);
        },
      });
      instance.create();
    });

    onBeforeUnmount(() => {
      instance.destroy();
      instance = null;
    });

    watch(
      () => props.editorContent,
      () => {
        const isSame = instance.txt.html() === props.editorContent;
        if (isSame) {
          return;
        }
        instance.txt.html(props.editorContent);
      }
    );

    return {
      editor,
      content,
    };
  },
};
</script>

<style></style>
