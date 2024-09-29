// directives/hasPermission.ts
import { DirectiveBinding } from 'vue';
import { useAuth } from '@/composables/useAuth';

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { hasPermission } = useAuth();
    if (!hasPermission(binding.value)) {
      el.style.display = 'none';
    }
  },
};
