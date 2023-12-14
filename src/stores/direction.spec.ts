import { describe, beforeEach, it, expect } from 'vitest'
import { setActivePinia, createPinia } from "pinia"
import { useDirectionStore } from "@/stores/direction"

describe('Direction Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    })

    it('directions contains Southbound only by default', () => {
        /*const direction = useDirectionStore();

        expect(direction.directions.length).toBe(1);
        expect(direction.directions[0]).toBe("Southbound");*/
    })

    it('directions contains Northbound as well if selected', () => {
        /*const direction = useDirectionStore();

        direction.setNorthboundSelection(false);

        expect(direction.directions.length).toBe(1);
        expect(direction.directions[0]).toBe("Southbound");

        direction.setNorthboundSelection(true);

        expect(direction.directions.length).toBe(2);
        expect(direction.directions[0]).toBe("Southbound");
        expect(direction.directions[1]).toBe("Northbound");*/
    })
})