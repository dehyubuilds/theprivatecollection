<template>
  <Navbar linkName="Upload Files" routeName="Upload" />

  <div class="MyUploads">
    <EmptyState v-if="!hasUploadedFiles" />

    <template v-else>
      <Container class="MyUploads__container">
        <Heading class="MyUploads__title" level="1">Your uploads</Heading>
        <Text>Here you can see all your uploaded files.</Text>
      </Container>

      <Container class="MyUploads__tabs-container">
        <Heading class="MyUploads__tabs-title" level="3">Select File Category</Heading>

        <TabContext :activeTab="activeTab">
          <TabList @onTabChange="setActiveTab">
            <Tab :name="TabNames.Videos" :total="totalVideos" :disabled="totalVideos === 0" />
            <Tab :name="TabNames.Images" :total="totalImages" :disabled="totalImages === 0" />
          </TabList>

          <TabLayout class="MyUploads__tabs-grid" :name="TabNames.Videos">
            <FileCard v-for="file in VideosFiles" :key="file.id" :file="file" />
          </TabLayout>

          <TabLayout class="MyUploads__tabs-grid" :name="TabNames.Images">
            <FileCard v-for="file in ImageFiles" :key="file.id" :file="file" />
          </TabLayout>
        </TabContext>
      </Container>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, readonly, onUnmounted, watchEffect, computed } from 'vue'
import { isImage } from '@/modules/file'
import { isVideo } from '@/modules/file'
import { useAppScroll } from '@/hooks/app-scroll'
import { useFile } from '@/contexts/file'
import EmptyState from './components/EmptyState.vue'
import { Container } from '@/components/Container'
import { Navbar } from '@/components/Navbar'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import { TabContext, TabLayout, TabList, Tab, useTabs } from '@/components/Tab'
import { FileCard } from '@/components/Cards/FileCard'
export default defineComponent({
  name: 'MyUploads',
  components: {
    Navbar,
    Container,
    Heading,
    Text,
    EmptyState,
    TabContext,
    TabLayout,
    TabList,
    Tab,
    FileCard,
  },
  setup() {
    const { enableAppScroll, disableAppScroll } = useAppScroll()
    const { storedFiles } = useFile()
    const VideosFiles = computed(() => storedFiles.value.filter((file) => isVideo(file.name)))
    // const ImageFiles = computed(() => storedFiles.value.filter((file) => file))
    const ImageFiles = computed(() => storedFiles.value.filter((file) => isImage(file.name)))
    const totalVideos = computed(() => VideosFiles.value.length)
    const totalImages = computed(() => ImageFiles.value.length)
    const hasUploadedFiles = computed(() => Boolean(storedFiles.value.length))
    const handleNoFiles = () => {
      window.scrollTo({ top: 0 })
      disableAppScroll()
    }
    const TabNames = readonly({ Videos: 'Videos', Images: 'Images' })
    const initialTab = () => {
      const hasVideos = totalVideos.value > 0
      return hasVideos ? TabNames.Videos : TabNames.Images
    }
    const { activeTab, setActiveTab } = useTabs(initialTab())
    watchEffect(() => {
      const hasFiles = Boolean(hasUploadedFiles.value)
      hasFiles ? enableAppScroll() : handleNoFiles()
    })
    onUnmounted(() => enableAppScroll())
    return {
      VideosFiles,
      ImageFiles,
      totalVideos,
      totalImages,
      hasUploadedFiles,
      TabNames,
      activeTab,
      setActiveTab,
    }
  },
})
</script>

<style lang="scss" scoped>
.MyUploads {
  overflow-x: hidden;
  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  &__title {
    max-width: rem(724px);
    margin-bottom: rem(40px);
  }
  &__tabs-container {
    width: 100%;
    max-width: rem(876px);
    margin: 0 auto;
    padding-top: 0;
    text-align: left;
  }
  &__tabs-title {
    margin-bottom: rem(24px);
  }
  &__tabs-grid {
    display: grid;
    gap: rem(24px);
    grid-template-columns: 1fr;
    @media (min-width: 37.5em) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 53.125em) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
</style>
