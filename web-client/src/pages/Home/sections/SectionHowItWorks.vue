<template>
  <section class="SectionHowItWorks" v-once>
    <Container>
      <div class="SectionHowItWorks__cards-container">
        <CardInfo title="Lorem ipsum " :color="makeRgba(EThemeColors.kournikovaRGB, cardOpacity)">
          <template #icon>
            <IconTimer :color="EThemeColors.kournikova" size="54" />
          </template>

          Nulla egestas sollicitudin dui, sit amet dictum urna tincidunt et. Suspendisse posuere
          tristique fringilla.
        </CardInfo>

        <CardInfo title="Lorem ipsum " :color="makeRgba(EThemeColors.kournikovaRGB, cardOpacity)">
          <template #icon>
            <IconTimer :color="EThemeColors.kournikova" size="54" />
          </template>

          Nulla egestas sollicitudin dui, sit amet dictum urna tincidunt et. Suspendisse posuere
          tristique fringilla.
        </CardInfo>

        <CardInfo title="Lorem ipsum " :color="makeRgba(EThemeColors.kournikovaRGB, cardOpacity)">
          <template #icon>
            <IconTimer :color="EThemeColors.kournikova" size="54" />
          </template>

          Nulla egestas sollicitudin dui, sit amet dictum urna tincidunt et. Suspendisse posuere
          tristique fringilla.
        </CardInfo>
      </div>
    </Container>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { EThemeColors, makeRgba } from '@/services/theme'
import { Container } from '@/components/Container'
import CardInfo from '@/pages/Home/components/CardInfo.vue'
import { IconTimer } from '@/components/Icons'

export default defineComponent({
  name: 'SectionHowItWorks',
  components: {
    Container,
    CardInfo,
    IconTimer,
  },
  setup() {
    const cardOpacity = 0.25

    return { EThemeColors, makeRgba, cardOpacity }
  },
})
</script>

<style lang="scss" scoped>
.SectionHowItWorks {
  text-align: center;

  &__description {
    margin: rem(14px 0 72px);
  }

  &__cards-container {
    max-width: rem(1073px);
    margin: 0 auto;
    display: flex;
    flex-flow: column wrap;
    gap: 24px;

    > * {
      flex: 1 1 rem(335px);
    }
  }

  @media (min-width: 61.25em) {
    &__cards-container {
      flex-flow: row wrap;
    }
  }
}
</style>
