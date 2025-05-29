# Refactoring

Vi har undervejs i processen refaktoreret i koden, for at omskrive eksisterende kode så kvaliteten, strukturen og læsbarheden blev forbedret.

- **Examples**: 
<pre>

1. [Test Case 1]
    CalendarHeader.vue havde sin egen scoped styling inde i filen, dette blev sat ind i main.scss filen, så stylingen for dette var samlet. 
    
    Før:
        <style lang="scss" scoped>
        @use "@/assets/main.scss";
        .calendar{
            display: flex;
            &__nav-button {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                margin: 0 1rem;
            }
        }
    
    Efter: 
        .calendar{
          display: flex;
          justify-content: space-between;
            &__nav-button {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                margin: 0 1rem;
            
                &--container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }   
        }
</style>

2. [Test Case 2]
    Inde i FilterRadio.vue blev der addet et span closing tag, så strukturen var komplet.

    Før: 
        <span class="filter__radio">
            <span class="filter__radio-dot" />
        </span>
        <div class="filter__content">

    Efter: 
        <span class="filter__radio">
            <span class="filter__radio-dot"></span>
        </span>
        <div class="filter__content">

3. [Test Case 3]
    I filen DayCell.vue blev en class omskrevet til at passe strukturen BEM, så stylingen der ellers lå scoped i samme fil kunne rykkes ind i main.scss filen. Hermed var stylingen for DayCell også samlet.

    Før: 
        <div v-if="eventCount > 0" class="event-count-badge">

        .event-count-badge {
            border: 1px solid #446A5A;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 0 0.2rem 2rem 0.2rem;
        }

    Efter:
        <div v-if="eventCount > 0" class="calendar__cell--event-count">

         &--event-count{
            border: 1px solid #446A5A;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 0 0.2rem 2rem 0.2rem;
        }



</pre>