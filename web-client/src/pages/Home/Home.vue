<template>
  <SectionHero />
  <SectionHowItWorks />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SectionHero from './sections/SectionHero.vue'
import SectionHowItWorks from './sections/SectionHowItWorks.vue'

export default defineComponent({
  name: 'Home',
  components: { SectionHero, SectionHowItWorks },
})
</script>
