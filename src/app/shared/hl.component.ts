import { Component, computed, input } from '@angular/core';

/** Renders copy where `*…*` marks the highlighted words (the store captions' gold phrase). */
@Component({
    selector: 'app-hl',
    host: { style: 'display: contents' },
    template: `@for (part of parts(); track $index) {@if (part.hl) {<span class="hl">{{ part.text }}</span>} @else {{{ part.text }}}}`,
})
export class HlComponent {
    readonly text = input.required<string>();
    readonly parts = computed(() =>
        this.text()
            .split(/(\*[^*]+\*)/)
            .filter(Boolean)
            .map((s) => (s.startsWith('*') && s.endsWith('*') ? { text: s.slice(1, -1), hl: true } : { text: s, hl: false })),
    );
}
