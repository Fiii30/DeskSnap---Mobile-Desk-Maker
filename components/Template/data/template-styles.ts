// Kunci template yang tersedia.
export type TemplateStyleKey = "tcg" | "fotocard" | "jqka" | "trivia";

// Tipe satu varian gaya kartu.
export type TemplateStyle = {
  id: string;
  title: string;
  isPremium: boolean;
  image: string;
};

// Konfigurasi varian untuk setiap template.
export const TEMPLATE_STYLES: Record<TemplateStyleKey, TemplateStyle[]> = {
  tcg: [
    {
      id: "tcg-default",
      title: "TCG Default",
      isPremium: false,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuArrPAhwHGDwOPIdLQpU7MnYCUw3Bnk6r3gUcx3sRD7SOpWJ5HcFoRcR3HL1xjoo3iRshsxVuCaLbZDyJJu3x1YC-QzUlZCmkfyn-u9py0Ds7Dpc9EVmnx2fzk6gU42VZ6G-Z1-FAlmfvXvRuVM2Jma0niXo2GGnlswrdwxJeXGBKFPH_XZ7LLU8w8qAb-DTN7bTw0WnpGfbBVc4491AQp6AbrHej1YUaZQU_C9cKe-qNqd2xFa-HeF",
    },
  ],

  fotocard: [
    {
      id: "fotocard-classic",
      title: "Fotocard Classic",
      isPremium: false,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC8FFZTB589CBfc6A55isHTlQaNB_DcIeZYy10ytOMx7micPPDocAaiywDMnFmL9omfiySITImD4-YTTjFk3fvUSbQNxvy1L_zi5rPXT-dbpNfzNGU5zkfvG-vXnZk8ogTap6ARxsLzZP34i6-sJ9Yb0A6LaaAEukdijzZoDmzjNUuK2N_lUHFJqTwwIKNZopA227yc2jtKD5bPNVa5nkXDjLvK0vq-zTwOJ2VLXn66T7EN2eb4wz1t",
    },
  ],

  jqka: [
    {
      id: "jqka-classic",
      title: "JQKA Classic",
      isPremium: true,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBzt9srUT1tCs0R--YSlHUE5MUwaYOz5D8rC8uJP6qAWz1PGSR7gtaoLgoHvg9b9HoNzeyj-U6YpVK7QEPilUOJIlL4erxxhKoT-XDWgp7IiUnWrx4kzm9lha_cY1Pi8dKO5VI0hZOym5h9i5DwIT9i54Quk-7p1F8Vwcot_ArUcER5PecbJes3MPZ8a0Wg35vi0kEcjPshNYrN6GTAy--CpEOQdxB8HMrTGXYETCDFugQt1JzTY_45",
    },
  ],

  trivia: [
    {
      id: "trivia-classic",
      title: "Trivia Classic",
      isPremium: true,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ0jthB-Tb8j8B6dnumN768dNG8oivlGq8FNKpSehxU17kRX1qCj_vnpiMz9z3_qkOfqLxvMJfmsF95d7ZTO9A9O7x0xKxSrwINPyxove4QfaAFIOjj3Wz4HQbD4tQNhrZb4m5nmizfXDm1vmdWFM1yAtv8UHMRO0E15wiL_lhj5u_kO3fjRDMKnEe8AfDtUA0gx_pqbGllOucWf48Bfy9RW6Dk7L7lMDw1EUYKbj-NIeoPZjRUvb7",
    },
  ],
};
